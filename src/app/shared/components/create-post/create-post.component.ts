import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostGqlService } from '@/core/services';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  public createPostForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private postGqlService: PostGqlService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  createPost() {
    const { name, content } = this.createPostForm.value;
    this.postGqlService
      .createNewPost({ name, content })
      .subscribe(({ data }) => {
        console.log('post: ', data);
      });
  }

  private buildForm() {
    this.createPostForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(16)]]
    });
  }
}
