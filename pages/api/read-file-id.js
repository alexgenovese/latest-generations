import { readFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
    const { query = '' } = req.query;
    if (!query) {
        res.status(400).json({ name: 'wrong' })
    } else {
        res.send(readFileSync(`/tmp/${query}.json`, 'utf8'));
    }
}