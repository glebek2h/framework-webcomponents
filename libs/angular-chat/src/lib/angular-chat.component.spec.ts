import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularChatComponent } from './angular-chat.component';

describe('AngularChatComponent', () => {
  let component: AngularChatComponent;
  let fixture: ComponentFixture<AngularChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
