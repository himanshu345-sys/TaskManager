import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAlert]'
})
export class AlertDirective 
{
  @Input("error") error:string;
  @HostBinding("title") title:string;
  constructor(private elementRef: ElementRef,private renderer2:Renderer2) 
  {

  }

  divElement:any;
  spanElement:any;
  spanText:any;

  ngOnInit()
  {

    this.divElement = this.renderer2.createElement("div")/* <div></div> */

    this.renderer2.setAttribute(this.divElement, "role", "alert");/* <div role="alert"></div> */

    /*<div class="alert alert-danger fade show"
    role="alert"> </div>*/
    this.renderer2.setAttribute(this.divElement, "class", "alert alert-danger fade show");

    /* <div class="alert alert-danger fade show"
    role="alert" style="transition:transform 0.5s"> </div> */
    this.renderer2.setStyle(this.divElement, "transition", "transform 0.5s");

    this.spanElement = this.renderer2.createElement("span");//<span></span>
    this.renderer2.setAttribute(this.spanElement,"class","message");

    this.spanText = this.renderer2.createText(this.error);

    /* <span class="message">${this.error}</span */
    this.renderer2.appendChild(this.spanElement,this.spanText);

    /* <div class="alert alert-danger fade show"
      role="alert" style="transition:transform 0.5s">
        <span class="message">${this.error}</span
      </div> */
    this.renderer2.appendChild(this.divElement,this.spanElement);

    this.elementRef.nativeElement.appendChild(this.divElement);


   /*  this.elementRef.nativeElement.innerHTML = `
    <div class="alert alert-danger fade show"
    role="alert" style="transition:transform 0.5s">
      <span>${this.error}</span
      </div>`; */
    
    this.title = "Please try again!";
    
  }

  @HostListener("mouseenter")
  onMouseEnter()
  {
    //this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1.1)";
    this.renderer2.setStyle(this.divElement,"transform","scale(1.1)");
  }

  @HostListener("mouseleave")
  onMouseLeave()
  {
    //this.elementRef.nativeElement.querySelector(".alert").style.transform = "scale(1)";
    this.renderer2.setStyle(this.divElement,"transform","scale(1)");
  }
}