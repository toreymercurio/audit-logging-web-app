import { Main } from '../components/Main/Main';
import { AppShell, Group, Title } from '@mantine/core';

export function HomePage() {
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >

        <AppShell.Header>
          <Group h="100%" px="md">
            <Title order={3}>Audit Logging Service</Title>
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          <Main />
        </AppShell.Main>
      </AppShell>
    </>
  );
}
