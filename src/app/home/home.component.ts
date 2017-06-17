import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private tasks = [
    "Already checked in?",
    "We will alert you when your gate is open.",
    "We will alert you when you can board"
  ];

  constructor() { }

  ngOnInit() {
  }

}
