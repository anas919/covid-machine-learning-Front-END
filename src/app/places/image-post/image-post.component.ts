import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mimeType } from './mime-type.validator';

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './../../error/error.component';
@Component({
  selector: 'app-image-post',
  templateUrl: './image-post.component.html',
  styleUrls: ['./image-post.component.css'],
})
export class ImagePostComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  constructor(
    public placesService: PlacesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveImage() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    this.placesService.uploadPicture(
      this.form.value.image
    ).subscribe(responseData => {
      this.dialog.open(ErrorComponent, {data: {message: responseData.result}});
      // console.log(responseData.result);
    });
    // this.form.reset();
  }
  // this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
  // async closeModal() {
  //   const onClosedData: string = "Wrapped Up!";
  //   await this.modalController.dismiss(onClosedData);
  // }

  ngOnDestroy() {
    // this.authStatusSub.unsubscribe();
  }
}
