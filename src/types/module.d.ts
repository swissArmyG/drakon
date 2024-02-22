declare module 'react-reveal' {
  export interface ZoomProps {
    duration?: number;
    declay?: number;
  }

  export class Zoom extends React.Component<ZoomProps> {}
}