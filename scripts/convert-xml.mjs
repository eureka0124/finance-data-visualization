import { XMLParser } from 'fast-xml-parser';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const xmlPath = join(__dirname, '..', '..', 'corp.xml');
const outputPath = join(__dirname, '..', 'public', 'corp-data.json');

const xml = readFileSync(xmlPath, 'utf-8');
const parser = new XMLParser();
const result = parser.parse(xml);

const rawList = result?.result?.list;
const list = Array.isArray(rawList) ? rawList : [rawList];

const companies = list
  .filter(Boolean)
  .map((item) => ({
    corp_code: String(item.corp_code).padStart(8, '0'),
    corp_name: item.corp_name ?? '',
    corp_eng_name: item.corp_eng_name ?? '',
    stock_code: item.stock_code ? String(item.stock_code).padStart(6, '0') : '',
  }));

writeFileSync(outputPath, JSON.stringify(companies), 'utf-8');
console.log(`변환 완료: ${companies.length}개 회사 → public/corp-data.json`);
