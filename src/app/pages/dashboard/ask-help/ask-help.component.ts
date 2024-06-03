import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-ask-help',
  standalone: true,
  imports: [
    NzModalModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './ask-help.component.html',
  styleUrl: './ask-help.component.css'
})
export class AskHelpComponent {
  askHelpForm : FormGroup;
  isVisible = false;
  messages: Message[] = [];


  constructor(
    private fb : FormBuilder
  ) {
    this.askHelpForm = fb.group({
      message: ['']
    })
   }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  sendMessage(): void {
    if (this.askHelpForm.valid) {
      const userMessage = this.askHelpForm.get('message')?.value;
      this.messages.push({ text: userMessage, sender: 'user' });
      this.askHelpForm.reset();

      // Simulate a bot response
      setTimeout(() => {
        this.messages.push({ text: 'This is a bot response.', sender: 'bot' });
      }, 1000);
    }
  }

}
