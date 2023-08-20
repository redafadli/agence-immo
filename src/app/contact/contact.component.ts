import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AppointmentService } from 'src/services/appointment.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { Appointment } from '../appointment';
import { EmailService } from 'src/services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  selectedDatetime!: Date;
  listingId!: number;

  constructor(
    public authenticationService: AuthenticationService,
    public appointmentsService: AppointmentService,
    public authService: AuthService,
    private emailService: EmailService,
    private snackBar: MatSnackBar) { }

  goToMaps() {
    window.open("https://www.google.com/maps/place/High+School+in+Hainaut+-+Technical+Campus/@50.4624181,3.9556901,17z/data=!4m15!1m8!3m7!1s0x47c24fe1b8f764c1:0xc9894a48f899d3ba!2sAv.+Victor+Maistriau+13,+7000+Mons!3b1!8m2!3d50.4637089!4d3.956881!16s%2Fg%2F11cncdkvd_!3m5!1s0x47c24fe1877bfae3:0x456a0e68bdf40ebd!8m2!3d50.4613265!4d3.9579119!16s%2Fg%2F11r92yxk5?entry=ttu"
    , "_blank");
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
  
    // Check if the appointment already exists
    this.appointmentsService.getAppointments().subscribe(appointments => {
      const existingAppointment = appointments.find(app => {
        const existingDateTime = new Date(app.appointment_date_time);
        return existingDateTime.getTime() === appointmentDateTime.getTime();
      });

      if(this.listingId == null) {
        this.snackBar.open('Veuillez entrer un numéro de référence', 'Close');
      }
      if (existingAppointment) {
        // The appointment already exists
        this.snackBar.open("Le rendez-vous n'est pas disponible.", 'Close');
      } else {
        // The appointment doesn't exist, add it
        this.appointmentsService.postAppointment(appointment).subscribe(() => {
          this.snackBar.open("Le rendez-vous est confirmé.", 'Close');
        });
      }
    });
  }
}
