const { decode, parse } = require('./response')

describe('Protocol > Requests > Fetch > v4', () => {
  test('response', async () => {
    const data = await decode(Buffer.from(require('../fixtures/v4_response.json')))
    expect(data).toEqual({
      throttleTime: 0,
      responses: [
        {
          topicName: 'test-topic-ab4d54774dcadc395a7f',
          partitions: [
            {
              partition: 0,
              errorCode: 0,
              highWatermark: '3',
              abortedTransactions: [],
              lastStableOffset: '3',
              messages: [
                {
                  offset: '0',
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  headers: { 'header-key-0': Buffer.from('header-value-0') },
                  key: Buffer.from('key-0'),
                  value: Buffer.from('some-value-0'),
                },
                {
                  offset: '1',
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  headers: { 'header-key-1': Buffer.from('header-value-1') },
                  key: Buffer.from('key-1'),
                  value: Buffer.from('some-value-1'),
                },
                {
                  offset: '2',
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  headers: { 'header-key-2': Buffer.from('header-value-2') },
                  key: Buffer.from('key-2'),
                  value: Buffer.from('some-value-2'),
                },
              ],
            },
          ],
        },
      ],
    })

    await expect(parse(data)).resolves.toBeTruthy()
  })

  test('response with GZIP', async () => {
    const data = await decode(Buffer.from(require('../fixtures/v4_response_gzip.json')))
    expect(data).toEqual({
      throttleTime: 0,
      responses: [
        {
          topicName: 'test-topic-43c95a3dc68dbf78a359',
          partitions: [
            {
              partition: 0,
              errorCode: 0,
              highWatermark: '6',
              lastStableOffset: '6',
              abortedTransactions: [],
              messages: [
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  offset: '0',
                  headers: {},
                  key: Buffer.from('key-0'),
                  value: Buffer.from('some-value-0'),
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  offset: '1',
                  headers: {},
                  key: Buffer.from('key-1'),
                  value: Buffer.from('some-value-1'),
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  offset: '2',
                  headers: {},
                  key: Buffer.from('key-2'),
                  value: Buffer.from('some-value-2'),
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  offset: '3',
                  headers: {},
                  key: Buffer.from('key-1'),
                  value: Buffer.from('some-value-1'),
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  offset: '4',
                  headers: {},
                  key: Buffer.from('key-2'),
                  value: Buffer.from('some-value-2'),
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1509827900073',
                  offset: '5',
                  headers: {},
                  key: Buffer.from('key-3'),
                  value: Buffer.from('some-value-3'),
                },
              ],
            },
          ],
        },
      ],
    })

    await expect(parse(data)).resolves.toBeTruthy()
  })

  test('response with 0.10 format', async () => {
    const data = await decode(Buffer.from(require('../fixtures/v4_response_010_format.json')))
    expect(data).toEqual({
      throttleTime: 0,
      responses: [
        {
          topicName: 'test-topic2-08a2f12dddd8c924460f-78767-02073a3e-0622-4d0d-9ee9-b5d6a5a326f1',
          partitions: [
            {
              partition: 1,
              errorCode: 0,
              highWatermark: '1',
              lastStableOffset: '1',
              abortedTransactions: [],
              messages: [
                {
                  offset: '0',
                  size: 158,
                  crc: 2036710961,
                  magicByte: 1,
                  attributes: 0,
                  timestamp: '1538502423117',
                  key: Buffer.from(
                    'key-9bf6284dc11345082649-78767-f79b4780-f2aa-4bbb-979f-9a4815652b5c'
                  ),
                  value: Buffer.from(
                    'value-9bf6284dc11345082649-78767-f79b4780-f2aa-4bbb-979f-9a4815652b5c'
                  ),
                },
              ],
            },
          ],
        },
      ],
    })

    await expect(parse(data)).resolves.toBeTruthy()
  })

  test('response with several RecordBatch (from Scala producer)', async () => {
    const data = await decode(
      Buffer.from(require('../fixtures/v4_from_scala_producer_response.json'))
    )
    expect(data).toEqual({
      throttleTime: 0,
      responses: [
        {
          topicName: 'test-topic-bec28e95-0c2f-49d3-a230-2418dceac885',
          partitions: [
            {
              partition: 0,
              errorCode: 0,
              highWatermark: '6',
              lastStableOffset: '6',
              abortedTransactions: [],
              messages: [
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1539644731680',
                  offset: '0',
                  key: Buffer.from('KEY-1'),
                  value: Buffer.from('VALUE-Lorem ipsum dolor sit amet-1'),
                  headers: {},
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1539644732194',
                  offset: '1',
                  key: Buffer.from('KEY-2'),
                  value: Buffer.from('VALUE-Lorem ipsum dolor sit amet-2'),
                  headers: {},
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1539644732699',
                  offset: '2',
                  key: Buffer.from('KEY-3'),
                  value: Buffer.from('VALUE-Lorem ipsum dolor sit amet-3'),
                  headers: {},
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1539644733203',
                  offset: '3',
                  key: Buffer.from('KEY-4'),
                  value: Buffer.from('VALUE-Lorem ipsum dolor sit amet-4'),
                  headers: {},
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1539644733708',
                  offset: '4',
                  key: Buffer.from('KEY-5'),
                  value: Buffer.from('VALUE-Lorem ipsum dolor sit amet-5'),
                  headers: {},
                },
                {
                  magicByte: 2,
                  attributes: 0,
                  timestamp: '1539644734213',
                  offset: '5',
                  key: Buffer.from('KEY-6'),
                  value: Buffer.from('VALUE-Lorem ipsum dolor sit amet-6'),
                  headers: {},
                },
              ],
            },
          ],
        },
      ],
    })

    await expect(parse(data)).resolves.toBeTruthy()
  })
})
