/**
 * Created by Administrator on 2017/9/19.
 */
import { fetch } from 'utils/fetch';
export function getSnmp()
{
    return fetch(
        {
            url: '/api/admin/snmp/snmp',
            method: 'GET',
            body: '',
        }
    )

}
export function getSnmpPut(parmas)
{
    return fetch(
        {
            url: '/api/admin/snmp/snmp',
            method: 'put',
            body: parmas,
        }
    )

}