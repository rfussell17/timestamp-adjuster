import React from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type ToggleProps = {
  label: string; 
  enabled?: boolean; 
  onChange: () => void;
};

export default function Toggle({ label, enabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center"> 
      <label className="mr-2">{label}</label> 
      <Switch
        checked={enabled}
        onChange={onChange}
        className={classNames(
          enabled ? 'bg-deep-blue' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-deep-blue focus:ring-offset-2'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </div>
  );
}
