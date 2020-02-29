import { createDbHandler } from '../infrastructure/db';
import { ValueStream, Step } from '@/model/ValueStream';
import { EmptyArray } from '@/model/empty';


/**
 * singleton
 */
class ValueStreamDomain {
    private dbHandler: any

    constructor() {
        this.dbHandler = createDbHandler('valueStreams', [])
    }

    static getInstance = () => {
        let singleton;
        if (!singleton) {
            singleton = new ValueStreamDomain()
        }
        return singleton
    }

    createValueStream = async (valueStream: ValueStream) => {
        return (await this.dbHandler).push(valueStream).write()
    }

    getValueStream = async (id: string) => {
        return (await this.dbHandler).find({ id }).value()
    }

    deleteValueStream = async (id: string) => {
        return (await this.dbHandler).remove({ id }).write()
    }

    getValueStreamSteps = async (id: string) => {
        return (await this.dbHandler).find({ id }).get(`steps`).value()
    }

    updateValueStreamStep = async (id: string, newStep: Step) => {
        let steps: Step[] = await (await this.dbHandler).find({ id }).get(`steps`).value()
        const modifiedIndex = steps.findIndex(step => step.id === newStep.id)
        if (modifiedIndex < 0) {
            return (await this.dbHandler).find({ id }).set(`steps`, steps.concat(newStep)).write()
        }
        steps = steps.slice(0, modifiedIndex).concat(newStep)
            .concat(steps.slice(modifiedIndex + 1))
        return (await this.dbHandler).find({ id }).set(`steps`, steps).write()
    }

    deleteStep = async (valueStreamId: string, stepId: string) => {
        let steps: Step[] = await (await this.dbHandler).find({ id: valueStreamId }).get(`steps`).value()
        if (!steps) return
        steps = steps.filter(item => item.id !== stepId)
        return (await this.dbHandler).find({ id: valueStreamId }).set(`steps`, steps).write()
    }

    getAvailableValueStreamOfUser = async (userId: string) => {
        return (await this.dbHandler)
            .filter((valueStream: ValueStream) => (valueStream.members ?? EmptyArray).indexOf(userId) > 0 || valueStream.creator === userId)
            .map((valueStream: ValueStream) => ({ id: valueStream.id, name: valueStream.name })).value()

    }
}

export default ValueStreamDomain