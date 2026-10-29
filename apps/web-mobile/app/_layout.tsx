import { Slot } from 'expo-router';
import { RootProviders } from '@muntu/shared';

export default function Layout() {
  return (
    <RootProviders>
      <Slot />
    </RootProviders>
  );
}
