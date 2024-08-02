---
title: Why I never wrap 3rd party components
slug: why-i-never-wrap-3rd-party-components
description: and what I do instead.
coverImage: https://plus.unsplash.com/premium_photo-1666324774358-d5d339dbca30?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
coverImageWidth: 400
date: 2024-08-01
tags: [frontend, angular]
---

# Why I will never wrap 3rd party components

_Sorry for the clickbaity title, please replace **never** with **probably never**._ 😉

Raise your hand if you have ever wrapped a 3rd party component (Angular Material?) in your Angular application.

🙋‍♂️

## The requirement

Our product manager has a vision of building the ultimate CRUD app consisting of many screens with grid views.
We will use `ag-grid` as our grid component.
The manager promises us they will all look, feel, and behave the same.

## The problem

We believe them. As the ambitious developer that we are, we start building a reusable grid component, that wraps `ag-grid` and encapsulates our requirements into a more user/developer-friendly API.

With time our manager will ask for more features, and we will add them to our wrapper component. We need to sync every `@Input` and `@Output` with the underlying `ag-grid` component.
Our wrapping component keeps growing with each feature request of our manager.

After a couple of sprints the initial promise of all grid views behaving the same is broken and we have a one-off completely different grid view than the rest. We have quite a lot of initialisation logic in our reusable grid component that we would like to apply as well, but we are too constrained by our wrapper and would much rather prefer just working with ag-grid directly.

## What I do instead

Angular Directives are an often overlooked feature of Angular. They allow you to easily extend and modify functionality of an existing component (and directive). Think of it as extending an existing class in OOP.

Now, instead of wrapping a 3rd party component/directive I instead create my own directive which does the following things.

### Inject the host component/directive

The first thing I need is to get access to the host (3rd party) component that we are targeting, to be able to set properties and call methods on it.

I pass `{host: true}`, which stops injection at the host component's injector. This means in practice that it will throw an error if the directive is not applied to an instance of `AgGridAngular`.

```ts
class AgGridDefaultsDirective<T> {
  private readonly agGridAngular = inject<AgGridAngular<T>>(AgGridAngular, { host: true });
}
```

Now that I have access to the host ag-grid, I can initialize the default logic that I would like to be applied on all ag-grids in my application.

```ts
constructor() {
  const api = this.agGridAngular.api;

  // Autosize all columns on window resize
  fromEvent(window, 'resize').pipe(
    debounceTime(100),
    tap(() => api.sizeColumnsToFit()),
    takeUntilDestroyed()
  ).subscribe();
}
```

### Implement different directives based on requirements

The nice thing about this approach is that I can create multiple directives that do only one thing, and apply them to any ag-grid when needed.

Let's assume we need to "remember" the column sizes of the grid. Or we need to sync the filter state with URL query parameters. Each of these simple requirements can be encapsulated in a directive (and easily unit tested) and applied to those `ag-grid`s that need it.

### Proptip: automagically applying directives to components without having to remember to

If you are like me, you will forget to apply the directive to the component. A neat trick about directives (and components) is that you can specify **any** target selector that the directive should be applied to.

This means that you can simply use the `ag-grid`'s HTML tag as the directive's selector and whenever the directive is defined in the component's `imports: []` array it will automatically be instantiated on any `ag-grid` element.

```ts
@Directive({
  selector: 'ag-grid',
})
class AgGridDefaultsDirective<T> {
  // ...
}
```

And in the consuming component simply import the directive.

```ts
@Component({
  standalone: true,
  imports: [AgGridAngular, AgGridDefaultsDirective],
})
```

```html
<!-- The AgGridDefaultsDirective will be applied to this ag-grid element -->
<ag-grid />
```

And to avoid the issue of forgetting to avoid to import the directive I simply export an array called `AgGrid`, which I import everywhere I need to use `ag-grid` with the defaults applied to it.

```ts
export const AgGrid = [AgGridAngular, AgGridDefaultsDirective];
```

```ts
@Component({
  standalone: true,
  imports: [AgGrid],
})
```

Angular automatically flattens the array and applies the directives to the `ag-grid` element.

## Conclusion

Wrapping 3rd party components is a common practice in Angular applications. I believe that using directives is a much cleaner and more maintainable approach to extending and modifying 3rd party components.

We can encapsulate each single requirement into its own directive, write unit tests for it and easily document the directive's behavior.
