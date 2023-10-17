import { Component } from '@angular/core';
import { FilmService } from 'src/app/services/film.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})

export class TagsComponent {
  tags?: Tag[];
  constructor(filmService:FilmService) {
    this.tags = filmService.getAllTags();
  }
}
