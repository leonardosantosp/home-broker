package kafka

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

type Producer struct {
	ConfigMap *kafka.ConfigMap
}

func NewKafkaProducer(confingMap *kafka.ConfigMap) *Producer{
	return &Producer{
		ConfigMap: confingMap,
	}
}

func (p *Producer) Publish(msg interface{}, key []byte, topic string) error {
	producer, err := kafka.NewProducer(p.ConfigMap)
	if err != nil {
		panic(err)
	}

	message := &kafka.Message{
		Value: msg.([]byte),
		Key: key,
		TopicPartition: kafka.TopicPartition{
			Topic: &topic,
			Partition: kafka.PartitionAny,
		},
	}

	err = producer.Produce(message, nil)

	if err != nil {
		return err
	}

	return nil
}