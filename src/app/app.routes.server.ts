import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'ngr-home',
    renderMode: RenderMode.Prerender
  },
   {
    path: '**',
    renderMode: RenderMode.Client
  }
]