interface IAccounts {
  id: {
    renderButton(
      element: Element | null,
      config: {
        theme: 'filled_black' | 'outline';
        shape: 'pill';
        width: number;
        locale: 'uz';
      },
    );
  };
}

declare let google: {
  accounts: IAccounts;
};
