export const RobotController = {
  currentState: 'idle',
  inactivityTimer: null,

  setState(state) {
    const robot = document.getElementById('ask-sri-robot');
    if (!robot) return;
    const classesToRemove = Array.from(robot.classList).filter(c => c.startsWith('robot--'));
    classesToRemove.forEach(c => robot.classList.remove(c));
    robot.classList.add(`robot--${state}`);
    this.currentState = state;
  },

  startInactivityWatch() {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      if (this.currentState === 'idle') {
        this.setState('waving');
        setTimeout(() => this.setState('idle'), 3500);
      }
    }, 8000);
  },

  onUserTyping()    { this.startInactivityWatch(); this.setState('idle'); },
  onApiCallStart()  { this.setState('thinking'); },
  onStreamStart()   { this.setState('talking'); },
  onStreamEnd()     { this.setState('idle'); this.startInactivityWatch(); },
  onExcitedTopic()  { this.setState('excited'); setTimeout(() => this.setState('idle'), 1500); },
  onConfusedTopic() { this.setState('confused'); },
};
