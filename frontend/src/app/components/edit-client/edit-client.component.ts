import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client/client';
import { ActivatedRoute, Router } from "@angular/router";

import { ClientService } from "../../services/client/client.service";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  selectedClient: Client;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { 
    this.selectedClient = new Client();
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.clientService.getById(params.id)
      .subscribe(
        res => {
          this.selectedClient = res;
        },
        err => console.log(err)
      );
  }

  editClient(){
    delete this.selectedClient.id_cliente;
    this.clientService.editClient(this.activatedRoute.snapshot.params.id, this.selectedClient)
      .subscribe(
        res => {
          this.router.navigate(['/clients']);
        },
        err => console.log(err)
      );
  }

}
