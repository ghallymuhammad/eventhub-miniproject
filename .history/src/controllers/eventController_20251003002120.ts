import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { EventService } from '../services/eventService';
import { UserRole } from '@prisma/client';

export class EventController {
  static async getAllEvents(request: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(request.url);
      const organizerId = searchParams.get('organizerId');
      const search = searchParams.get('search');
      const category = searchParams.get('category');
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');

      // If requesting organizer's events, check permissions
      if (organizerId) {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
          return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        if (session.user.role !== UserRole.ORGANIZER || session.user.id !== organizerId) {
          return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
        }
        
        const events = await EventService.getEventsByOrganizer(organizerId, {
          search,
          category,
          page,
          limit
        });
        
        return NextResponse.json({
          success: true,
          data: events
        });
      }

      // Get public events for regular users
      const events = await EventService.getPublicEvents({
        search,
        category,
        page,
        limit
      });

      return NextResponse.json({
        success: true,
        data: events
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch events'
        },
        { status: 500 }
      );
    }
  }

  static async getEventById(
    request: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<NextResponse> {
    try {
      const event = await EventService.getEventById(params.id);

      if (!event) {
        return NextResponse.json(
          {
            success: false,
            error: 'Event not found'
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: event
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch event'
        },
        { status: 500 }
      );
    }
  }

  static async createEvent(request: NextRequest): Promise<NextResponse> {
    try {
      const body = await request.json();

      // Here you would typically validate the user has the right permissions
      // and validate the input data

      const event = await EventService.createEvent(body);

      return NextResponse.json(
        {
          success: true,
          data: event
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error creating event:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create event'
        },
        { status: 500 }
      );
    }
  }

  static async updateEvent(
    request: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<NextResponse> {
    try {
      const body = await request.json();

      // Here you would typically validate the user has the right permissions

      const event = await EventService.updateEvent(params.id, body);

      if (!event) {
        return NextResponse.json(
          {
            success: false,
            error: 'Event not found'
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: event
      });
    } catch (error) {
      console.error('Error updating event:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update event'
        },
        { status: 500 }
      );
    }
  }

  static async deleteEvent(
    request: NextRequest,
    { params }: { params: { id: string } }
  ): Promise<NextResponse> {
    try {
      // Here you would typically validate the user has the right permissions

      await EventService.deleteEvent(params.id);

      return NextResponse.json({
        success: true,
        message: 'Event deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete event'
        },
        { status: 500 }
      );
    }
  }
}
