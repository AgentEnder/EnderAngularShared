# Ng2Transition

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Slide Transitions

Using the directive `ng2tSlide` you can easily add sliding transitions to any html element. The main caveat currently is that this requires overflow: hidden.

### Known Limitations:

Any inline-styles for height, display, or transition will be removed by the directive. Avoid using these.

An inline style for overflow-hidden will be added. This is necessary for the transition to work correctly.

### Code Sample

```html
<button (click)="test.show()">Show</button>
<button (click)="test.hide()">Hide</button>
<button (click)="test.toggle()">Toggle</button>

<div class="container">
  <div class="content">
    <div ng2tSlide #test="ng2tSlide">
      <p>Duis nostrud veniam eiusmod amet nisi. Quis quis qui proident excepteur ut. Esse do veniam elit cillum esse cupidatat exercitation. Sunt magna velit nisi non. Velit est nostrud ut ipsum duis sit nisi culpa. Dolore amet quis qui ex qui labore dolor enim enim do excepteur.</p>
      <p>Veniam ex exercitation pariatur minim magna ut sint elit ad. Ullamco aliqua mollit ad deserunt sint magna id reprehenderit deserunt deserunt aliquip Lorem aliquip velit. Id culpa enim irure ullamco cupidatat proident do sit. Aute sunt reprehenderit consectetur nisi Lorem fugiat nostrud mollit in quis culpa Lorem. Exercitation commodo eiusmod commodo anim cillum laborum. Consequat et culpa duis proident.</p>
      <p>Deserunt Lorem qui Lorem sunt nulla qui culpa culpa fugiat exercitation in. Duis aute elit proident ea enim sit magna. Officia elit anim nisi deserunt et veniam ex ullamco aliquip ipsum officia labore. Consequat commodo pariatur magna consequat nostrud duis Lorem non laboris. Voluptate irure et exercitation ipsum est nostrud enim aliquip eiusmod dolor eiusmod tempor et cillum. Velit magna quis aute non ex commodo in et amet Lorem ipsum reprehenderit.</p>
    </div>
  </div>
</div>
```
