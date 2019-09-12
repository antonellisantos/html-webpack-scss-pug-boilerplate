/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { readdir, writeFile } from 'fs';

const htmlPlace = './dist';
const ulrPart = [];

readdir(`${htmlPlace}`, (err, files) => {
  if (err) throw err;

  for (const index in files) {
    const rest = files[index].split('.')[1];
    // const name = files[index].split('.')[0];
    // let changeFreq = name === 'index' ? 'weekly' : 'monthly';
    const changeFreq = 'monthly';

    if (rest === 'html') {
      const path = `
        <url>
        <loc>http://blog.grzegorztomicki.pl/${files[index]}</loc>
        <changefreq>${changeFreq}</changefreq>
        </url>`;

      ulrPart.push(path);
    }
  }

  const template = `
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${ulrPart.join('')}
    </urlset>`;

  writeFile('./dist/sitemap.xml', template, () => {});
});
