/** @type {import('next').NextConfig} */

const { headers } = require('next/headers');

const API_KEY = process.env.API_KEY;

const nextConfig = {
    reactStrictMode: false,
    async headers() {
        return [
            {
              // matching all API routes
              source: "/api/:path*",
              headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
            }
          ]
    },
    async rewrites() {
        return [
            {
                source: "/api/summoner/:puuid",
                destination: `${process.env.BASE_KR_URL}/lol/summoner/v4/summoners/by-puuid/:puuid?api_key=${API_KEY}`,
            },
            {
                source: "/api/rotation",
                destination: `${process.env.BASE_KR_URL}/lol/platform/v3/champion-rotations?api_key=${API_KEY}`,
            },
            {
                source: "/api/account/name/:gameName/:tagLine",
                destination: `${process.env.BASE_ASIA_URL}/riot/account/v1/accounts/by-riot-id/:gameName/:tagLine?api_key=${API_KEY}`,
            },
            {
                source: "/api/matches/:puuid",
                destination: `${process.env.BASE_ASIA_URL}/lol/match/v5/matches/by-puuid/:puuid/ids?api_key=${API_KEY}`,
            },
            {
                source: "/api/match/:matchId",
                destination: `${process.env.BASE_ASIA_URL}/lol/match/v5/matches/:matchId?api_key=${API_KEY}`,
            },
            {
                source: "/api/rank/:summonerId",
                destination: `${process.env.BASE_KR_URL}/lol/league/v4/entries/by-summoner/:summonerId?api_key=${API_KEY}`,
            },
        ];
    },
};

module.exports = nextConfig
