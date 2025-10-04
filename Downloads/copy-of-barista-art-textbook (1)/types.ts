
import type React from 'react';

export interface Chapter {
  id: string;
  title: string;
  shortTitle: string;
  component: React.ComponentType;
}
