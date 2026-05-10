"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({
  ...props
}) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger(props) {
  const triggerProps = { ...props };
  delete triggerProps.asChild;

  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...triggerProps} />;
}

function CollapsibleContent({
  ...props
}) {
  return (<CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />);
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
