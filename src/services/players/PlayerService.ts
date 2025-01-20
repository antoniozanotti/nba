import { nbaApi } from "@/services/nbaApi";
import type { NBAGetResponseType } from "@/services/types/NBAGetResponseType";
import type { PlayerType } from "./types/PlayerType";

async function getPlayers(resultsPerPage: number = 100) {
  return await nbaApi.get<NBAGetResponseType<PlayerType[]>>(
    `players?per_page=${resultsPerPage}`
  );
}

async function getPlayerById(id: number) {
  return await nbaApi.get<Omit<NBAGetResponseType<PlayerType>, "meta">>(
    `players/${id}`
  );
}

async function createPlayer(newPlayer: Omit<PlayerType, "id">) {
  return await Promise.resolve({ status: 201, data: { id: 1, ...newPlayer } });
}

async function updatePlayer(updatedPlayer: PlayerType) {
  return await Promise.resolve({ status: 200, data: updatedPlayer });
}

async function deletePlayer(_id: number) {
  return await Promise.resolve({ status: 200 });
}

export const PlayerService = {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};
