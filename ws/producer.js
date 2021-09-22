const produce = async (data, producerTransport) => {
    const {kind, rtpParameters} = data;
    const producer = await producerTransport.produce({ kind, rtpParameters });

    return producer
}

export default produce