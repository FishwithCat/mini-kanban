import { createDbHandler } from '../infrastructure/db';
import { ValueStream, Step } from '@/model/ValueStream';
import { EmptyArray } from '@/model/empty';
import { immutableUpdateList, immutableUpdateObjList } from '@/model/utils';


/**
 * singleton
 */
class ValueStreamDomain {
    private dbHandler: any
    private static instance: ValueStreamDomain;

    constructor() {
        this.dbHandler = createDbHandler('valueStreams', [])
    }

    static getInstance = () => {
        if (!ValueStreamDomain.instance) {
            ValueStreamDomain.instance = new ValueStreamDomain()
        }
        return ValueStreamDomain.instance
    }

    createValueStream = async (valueStream: ValueStream) => {
        return (await this.dbHandler).push(valueStream).write()
    }

    renameValueStream = async (id: string, newName: string) => {
        return (await this.dbHandler).find({ id }).set('name', newName).write()
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
        const dbHandler = await this.dbHandler
        let steps: Step[] = await dbHandler.find({ id }).get(`steps`).value()
        steps = immutableUpdateObjList(steps, newStep, 'id')
        return dbHandler.find({ id }).set(`steps`, steps).write()
    }

    deleteStep = async (valueStreamId: string, stepId: string) => {
        const dbHandler = await this.dbHandler
        let steps: Step[] = await dbHandler.find({ id: valueStreamId }).get(`steps`).value()
        if (!steps) return null
        steps = steps.filter(item => item.id !== stepId)
        return dbHandler.find({ id: valueStreamId }).set(`steps`, steps).write()
    }

    getAvailableValueStreamOfUser = async (userId: string) => {
        return (await this.dbHandler)
            .filter((valueStream: ValueStream) => (valueStream.members ?? EmptyArray).indexOf(userId) >= 0 || valueStream.creator === userId)
            .map((valueStream: ValueStream) => ({ id: valueStream.id, name: valueStream.name })).value()

    }

    updateMembers = async (valueStreamId: string, newMemberId: string) => {
        const dbHandler = await this.dbHandler
        let members: string[] = await dbHandler.find({ id: valueStreamId }).get(`members`).value()
        if (!members) return
        members = immutableUpdateList(members, newMemberId)
        return dbHandler.find({ id: valueStreamId }).set(`members`, members).write()
    }

    deleteMember = async (valueStreamId: string, memberId: string) => {
        const dbHandler = await this.dbHandler
        let members: string[] = await dbHandler.find({ id: valueStreamId }).get('members').value()
        members = members.filter(item => item !== memberId)
        return dbHandler.find({ id: valueStreamId }).set(`members`, members).write()
    }
}

export default ValueStreamDomain