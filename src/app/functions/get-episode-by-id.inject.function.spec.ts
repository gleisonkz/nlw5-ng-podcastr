import { of } from 'rxjs';
import {
    EpisodeIdParamNotFoundError, getEpisodeByID
} from 'src/app/functions/get-episode-by-id.inject.function';
import { Episode } from 'src/app/models/episode.model';
import { EPISODE_SERVICE_TOKEN, IEpisodeService } from 'src/app/services/episode-service-token';
import { EpisodeService } from 'src/app/services/episode.service';
import { anyString, instance, mock, verify, when } from 'ts-mockito';

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

const EPISODE_MOCK: Episode = {
  id: 'a-importancia-da-contribuicao-em-open-source',
  title: 'Faladev #30 | A importância da contribuição em Open Source',
  shortTitle: 'Faladev #30 | A importância da contribuição em Open Source',
  members: 'Diego Fernandes, João Pedro, Diego Haz e Bruno Lemos',
  published_at: '2021-01-22 16:35:40',
  thumbnail: 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/opensource.jpg',
  description:
    '<p>Nesse episódio do Faladev, Diego Fernandes se reúne com João Pedro Schmitz, Bruno Lemos e Diego Haz, para discutir sobre a importância da contribuição open source e quais desafios circulam na comunidade.</p><p>A gente passa a maior parte do tempo escrevendo código. Agora chegou o momento de falar sobre isso. Toda semana reunimos profissionais da tecnologia para discutir sobre tudo que circula na órbita da programação.</p><p>O Faladev é um podcast original Rocketseat.</p>',
  file: {
    url: 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/audios/opensource.m4a',
    type: 'audio/x-m4a',
    duration: 3981,
  },
};

@Component({
  template: '',
})
class TestComponent {
  episodeID;

  constructor() {
    this.episodeID = getEpisodeByID();
  }
}

describe('[DI Function] - injectepisodeID', () => {
  let mockActivatedRoute: ActivatedRoute;
  let mockEpisodeService: IEpisodeService;

  const SOME_ID = 'some-id';
  const EMPTY_SNAPSHOT = { params: { id: null } } as any;
  const MOCK_SNAPSHOT = { params: { id: SOME_ID } } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useFactory: () => instance(mockActivatedRoute) },
        { provide: EPISODE_SERVICE_TOKEN, useFactory: () => instance(mockEpisodeService) },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockActivatedRoute = mock(ActivatedRoute);
    mockEpisodeService = mock(EpisodeService);

    when(mockActivatedRoute.snapshot).thenReturn(MOCK_SNAPSHOT);
    when(mockEpisodeService.getEpisodeByID(anyString())).thenReturn(of(EPISODE_MOCK));
  });

  it('should return the correct episodeID', () => {
    const component = TestBed.createComponent(TestComponent).componentInstance;

    component.episodeID.subscribe((episodeID) => {
      expect(episodeID).toBe(EPISODE_MOCK);
      verify(mockEpisodeService.getEpisodeByID(SOME_ID)).once();
    });
  });

  it('should throw an error if the episodeID is not found', () => {
    when(mockActivatedRoute.snapshot).thenReturn(EMPTY_SNAPSHOT);

    expect(() => TestBed.createComponent(TestComponent)).toThrowError(EpisodeIdParamNotFoundError);
    verify(mockEpisodeService.getEpisodeByID(anyString())).never();
  });
});
