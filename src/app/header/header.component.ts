import { Component, OnInit, Input } from '@angular/core';
import { MenuDefinition } from 'src/bs-util/data/MenuDefinition';
import { AuthService } from '../common/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title : string ="QcmApp" //as default value

  myMenuDefs :MenuDefinition[] = [
    { label : "QCM" , path : "/ngr-qcm" },
    { label : "admin" , 
    children : [
      { label : "login" , path : "/ngr-login" },
      { divider : true },
      { label : "admin-qcm" , path : "/ngr-admin-qcm" , role : "admin"  },
      { label : "admin-qcm-results" , path : "/ngr-admin-qcm-results", role : "admin"  }
    ]
    }

];

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
