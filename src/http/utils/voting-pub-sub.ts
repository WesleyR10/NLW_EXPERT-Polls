type SubscriberParams = {pollOptionId: string, votes: number}
type Subscriber = (message: SubscriberParams) => void

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {}  // Chave deles é o id da enquete - 2 param e quem ta ouvindo - é uum array de subscribe pois pode ter em tempo real mais de 1 Usuario ouvindo

  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(subscriber)
  }

  publish(pollId: string, message: SubscriberParams) {
    if (!this.channels[pollId]) {
      return
      }

      for ( const subscriber of this.channels[pollId]) {
        subscriber(message)
    }
  }
}

export const voting = new VotingPubSub() 