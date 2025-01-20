import { defineStore } from "pinia";
import type { PlayerType } from "@/services/players/types/PlayerType";
import { PlayerService } from "@/services/players/PlayerService";
import { AxiosError } from "axios";
import type { MessageInterface } from "@/components/messages/interfaces/MessageInterface";
import { useStorage } from "@vueuse/core";
import { UNKNOWN_ERROR_CODE } from "@/components/messages/consts/errors";

export const usePlayersStore = defineStore("players", () => {
  const players = useStorage<PlayerType[]>("players", []);

  function initPlayers(data: PlayerType[]) {
    players.value = data;
  }

  function addPlayer(player: PlayerType) {
    players.value.push(player);
  }

  function updatePlayer(player: PlayerType) {
    const idx = players.value.findIndex((p) => p.id === player.id);
    if (idx === -1) return;

    players.value[idx] = player;
  }

  function removePlayer(id: number) {
    const idx = players.value.findIndex((p) => p.id === id);
    if (idx === -1) return;

    players.value.splice(idx, 1);
  }

  function handleError(error: unknown) {
    const _error = error as AxiosError<string>;
    return returnError(
      _error.response?.status ?? UNKNOWN_ERROR_CODE,
      _error.message
    );
  }

  function returnError(statusCode: number, message?: string): MessageInterface {
    return {
      success: false,
      statusCode: statusCode,
      errorMessage: message ?? "",
    };
  }

  function returnSuccess(data?: any): MessageInterface {
    return data ? { success: true, data: data } : { success: true };
  }

  async function dispatchGetPlayers(): Promise<MessageInterface> {
    try {
      if (players.value.length > 0) {
        return returnSuccess();
      }
      const { status, data } = await PlayerService.getPlayers();

      if (status === 200) {
        initPlayers(data.data);
        return returnSuccess();
      }
      return returnError(status);
    } catch (error) {
      return handleError(error);
    }
  }

  async function getPlayerById(id: number): Promise<MessageInterface> {
    try {
      const { status, data } = await PlayerService.getPlayerById(id);

      return status === 200 ? returnSuccess(data.data) : returnError(status);
    } catch (error) {
      return handleError(error);
    }
  }

  async function dispatchCreatePlayer(
    newPlayer: Omit<PlayerType, "id">
  ): Promise<MessageInterface> {
    try {
      const { status, data } = await PlayerService.createPlayer(newPlayer);

      if (status === 201) {
        addPlayer(data);
        returnSuccess(data);
      }
      return returnError(status);
    } catch (error) {
      return handleError(error);
    }
  }

  async function dispatchUpdatePlayer(
    updatedPlayer: PlayerType
  ): Promise<MessageInterface> {
    try {
      const { status, data } = await PlayerService.updatePlayer(updatedPlayer);

      if (status === 200) {
        updatePlayer(data);
        return returnSuccess();
      }
      return returnError(status);
    } catch (error) {
      return handleError(error);
    }
  }

  async function dispatchDeletePlayer(id: number): Promise<MessageInterface> {
    try {
      const { status } = await PlayerService.deletePlayer(id);

      if (status === 200) {
        removePlayer(id);
        return returnSuccess();
      }
      return returnError(status);
    } catch (error) {
      return handleError(error);
    }
  }

  return {
    players,
    getPlayerById,
    dispatchGetPlayers,
    dispatchCreatePlayer,
    dispatchUpdatePlayer,
    dispatchDeletePlayer,
  };
});
