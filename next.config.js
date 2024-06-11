/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
    reactStrictMode: false,
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
