import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BooksService } from '@/core/services';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  createBookForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BooksService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  createBook() {
    this.bookService.createBook(this.createBookForm.value).subscribe({
      next: response => {
        if (response) {
          this.createBookForm.reset();
        }
      }
    });
  }

  addGenres() {
    this.genres.push(this.formBuilder.control(''));
  }

  get genres() {
    return this.createBookForm.get('genres') as FormArray;
  }

  private buildForm() {
    this.createBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      price: [''],
      genres: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ])
    });
  }
}
