export interface BackButtonOptionsInterface {
  /**
   * Disable render of the standard button
   */
  readonly disableBackButton: boolean;

  /**
   * Title for the custom button.
   * Only when disableBackButton: true
   */
  readonly title?: string;

  /**
   * Callback for the custom button.
   * Only when disableBackButton: true
   */
  readonly callback?: string;

  /**
   * Specifies which scene to go to when the "back" button is clicked.
   * Only when disableBackButton: false
   * Not available with inheritance in wizard
   */
  readonly transitionSceneName?: string;
}
