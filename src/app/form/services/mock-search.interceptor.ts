import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockSearchInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = new URL(req.url, window.location.origin);

    if (req.method === 'GET' && url.pathname.startsWith('/form/search/')) {
      const word = decodeURIComponent(url.pathname.replace('/form/search/', '') || '');

      const mockData = [
        { name: `${word || 'Alpha'} Formulario 1`, description: `Desc para ${word || 'Alpha'} A` },
        { name: `${word || 'Alpha'} Formulario 2`, description: `Desc para ${word || 'Alpha'} B` },
        { name: `${word || 'Alpha'} Formulario 3`, description: `Desc para ${word || 'Alpha'} C` }
      ];

      return of(new HttpResponse({ status: 200, body: mockData }));
    }

    return next.handle(req);
  }
}
