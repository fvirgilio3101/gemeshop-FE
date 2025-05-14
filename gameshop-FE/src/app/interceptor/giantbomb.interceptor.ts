
import { HttpInterceptorFn } from '@angular/common/http';

export const giantBombInterceptor: HttpInterceptorFn = (req, next) => {
 const isGiantBomb = req.url.includes('giantbomb.com/api');

  if (isGiantBomb) {
    const apiKey = '3295762f53d5b8590ff6a54d3beb730b3ec66f67';
    const newUrl = req.url.includes('?')
      ? `${req.url}&api_key=${apiKey}&format=json`
      : `${req.url}?api_key=${apiKey}&format=json`;

    const cloned = req.clone({ url: newUrl });
    return next(cloned);
  }

  return next(req);
  }


