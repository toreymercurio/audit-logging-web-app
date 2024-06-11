import { Group, TextInput, Button, Table, Select, Stack, Modal, Code } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { json } from 'react-router-dom';

export function Main() {
  const [opened, { open, close }] = useDisclosure(false);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [objectTypes, setObjectTypes] = useState<ObjectType[]>([])
  const [apps, setApps] = useState<App[]>([])
  const [jsonMessage, setJsonMessage] = useState('{}')

  useEffect(() => {
    fetch('http://127.0.0.1:8080/apps')
      .then(res => res.json())
      .then(res => {
        setApps(res._embedded?.appList || [])
      })
    fetch('http://127.0.0.1:8080/audit-logs/object-types')
      .then(res => res.json())
      .then(res => {
        setObjectTypes(res || [])
      })
  }, [])

  const form = useForm({
    mode: 'uncontrolled',
  });

  const search = (values: any) => {
    if (values.dateTime?.length > 1) {
      values.startDateTime = values.dateTime[0].toISOString();
      values.endDateTime = values.dateTime[1].toISOString();
      delete values.dateTime
    }
    let queryString = new URLSearchParams(values);
    fetch('http://127.0.0.1:8080/audit-logs/search?' + queryString)
      .then(res => res.json())
      .then(res => {
        setAuditLogs(res._embedded?.auditLogList || [])
      })
  }

  const showJsonMessage = (jsonMessage: string | undefined) => {
    setJsonMessage(jsonMessage || '');
    open()
  }

  const rows = auditLogs.map((auditLog) => (
    <Table.Tr key={auditLog.id}>
      <Table.Td>{auditLog.app.id}</Table.Td>
      <Table.Td>{auditLog.objectId}</Table.Td>
      <Table.Td>{auditLog.parentObjectId}</Table.Td>
      <Table.Td>{auditLog.objectType?.name}</Table.Td>
      <Table.Td>{auditLog.parentObjectType?.name}</Table.Td>
      <Table.Td>{new Date(auditLog.createdAt).toUTCString()}</Table.Td>
      {auditLog.jsonMessage && auditLog.jsonMessage?.length > 0 &&
        <Table.Td><Button onClick={() => showJsonMessage(auditLog.jsonMessage)}>View JSON</Button></Table.Td>
      }
    </Table.Tr >
  ));

  return (
    <Stack>
      <form onSubmit={form.onSubmit(search)}>
        <Group>
          <TextInput
            label="Object ID"
            placeholder="order123"
            key={form.key('objectId')}
            {...form.getInputProps('objectId')}
          />
          <Select
            label="Object Type"
            placeholder="order"
            data={objectTypes.map(objectType => { return { value: objectType.id.toString(), label: objectType.name } })}
            clearable
            key={form.key('objectTypeId')}
            {...form.getInputProps('objectTypeId')}
          />
          <Select
            label="App"
            placeholder="SFCC"
            data={apps.map(app => { return { value: app.id, label: app.name || app.id } })}
            clearable
            key={form.key('appId')}
            {...form.getInputProps('appId')}
          />
          <TextInput
            label="Created By"
            placeholder="Mr. Floor Decor"
            key={form.key('createdBy')}
            {...form.getInputProps('createdBy')}
          />
          <DatePickerInput
            type="range"
            clearable
            allowSingleDateInRange
            label="Date Range"
            placeholder="Pick date range"
            key={form.key('dateTime')}
            {...form.getInputProps('dateTime')}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </Group>
      </form>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>App ID</Table.Th>
            <Table.Th>Audit ID</Table.Th>
            <Table.Th>Parent Audit ID</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Parent Type</Table.Th>
            <Table.Th>Created Date</Table.Th>
            <Table.Th>JSON Message</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Modal opened={opened} onClose={close} title="JSON Message">
        <Code>{JSON.parse(jsonMessage)}</Code>
      </Modal>
    </Stack>
  );
}
