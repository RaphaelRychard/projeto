import ky from 'ky';
import { env } from 'process';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL, // sem import do 'process'
})