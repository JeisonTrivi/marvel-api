import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Personaje } from 'src/app/interfaces/Personaje';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  personajes!: Personaje[];
  personajesCopy!: Personaje[];

  constructor(public httpClient: HttpClient) {
    this.getData();
  }
  async getData() {
    await this.httpClient
      .get(
        'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=9431163fec35d46aeeddd2caa92c0728&hash=5d064e4f8aaebf3e8a8bd10a7ba7cd2e'
      )
      .subscribe((res: any) => {
        console.table(res.data.results);
        this.personajes = res.data.results.map(
          ({
            id,
            name,
            description,
            modified,
            resourceURI,
            urls,
            thumbnail,
            comics,
            stories,
            events,
            series,
          }: Personaje) => {
            return {
              id: id,
              name: name,
              description: description,
              modified: modified,
              resourceURI: resourceURI,
              urls: urls,
              thumbnail: thumbnail,
              comics: comics,
              stories: stories,
              events: events,
              series: series,
            };
          }
        );
        this.personajesCopy = this.personajes;
      });
  }

  filter(e: any) {
    const search = e.target.value;
    this.personajes = this.personajesCopy.filter(({ name }: Personaje) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }

  search() {
    const inputBox = document.querySelector('input-box');
    const searchIcon = document.querySelector('icon');
    const closeIcon = document.querySelector('close-icon');

    searchIcon?.addEventListener('click', () =>
      inputBox?.classList.add('open')
    );
    closeIcon?.addEventListener('click', () =>
      inputBox?.classList.remove('open')
    );
  }
}
