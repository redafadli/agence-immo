import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AppointmentService } from 'src/services/appointment.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { Appointment } from '../appointment';
import { EmailService } from 'src/services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  selectedDatetime!: Date;
  listingId!: number;

  constructor(
    private router: Router,
    public authenticationService: AuthenticationService,
    public appointmentsService: AppointmentService,
    public authService: AuthService,
    private emailService: EmailService) { }

  goToMaps() {
    //need to go to maps
    this.router.navigate(['/listings']);
  }

  getMinDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);

    return `${year}-${month}-${day}T00:00`;
  }

  public addAppointment(): void {
    let appointment: Appointment = {
      id: 0,
      appointment_date_time: this.selectedDatetime,
      user_email: this.authenticationService.currentUserName,
      listing_id: this.listingId
    };
  
    const appointmentDateTime = new Date(appointment.appointment_date_time);
  
    // Check if the appointment already exists based on the appointment_date_time
    this.appointmentsService.getAppointments().subscribe(appointments => {
      const existingAppointment = appointments.find(app => {
        const existingDateTime = new Date(app.appointment_date_time);
        return existingDateTime.getTime() === appointmentDateTime.getTime();
      });
  
      if (existingAppointment) {
        // The appointment already exists, handle accordingly (e.g., show an error message)
        console.log("The appointment is not available");
      } else {
        // The appointment doesn't exist, add it
        this.appointmentsService.postAppointment(appointment).subscribe(() => {
          console.log('Appointment added successfully.');
          // this.emailService.sendConfirmationEmail(this.authenticationService.currentUserName);
        });
      }
    });
  }
}
