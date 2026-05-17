import counterModel from "../Model/counter.model.js"


const getNextSequence = async (sequenceName, startValue = 1000000) => {

    const update = await counterModel.findOneAndUpdate(
        { counterId: sequenceName },
        { $inc: { $seq: 1 } },
        { new: true }

    ).lean()

    // create new id 
    if (!update) {
        const newCounter = await counterModel({
            counterId: sequenceName,
            seq: startValue
        }).save()
        return newCounter.seq
    }

    return update.seq

}


export { getNextSequence };