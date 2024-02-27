import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() btn:boolean = true;
  @Input() back:string = "/";
  @Input() tip:string="Volver";
  @Input() titulo:string = "";
  @Input() descripcion:string="";
  @Input() desactivarTip:boolean = false;
  constructor(private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  
  goBack():void{
    this.route.navigate([this.back], {relativeTo: this.activatedRoute});
  }
}
