import { Component } from "@angular/core";
import { ASSETS } from "app/shared/constants/assets.constants";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  logo = ASSETS.LOGO;
}

