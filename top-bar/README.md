# vj-top-bar

> To use horizontal top header bar with logo & menu links

## Install

```
 npm install vj-top-bar -S
```

## Usage
```html
<!-- Image URL -->
    <vj-top-bar logo="https://cdn.pixabay.com/photo/2017/02/15/20/58/ekg-2069872_1280.png">
      <span class="logo-title" slot="logo_title">VJ-Topbar</span>
    </vj-top-bar>

<!-- Empty logo -->
    <vj-top-bar logo="">
      <span class="logo-title" slot="logo_title">VJ-Topbar</span>
    </vj-top-bar>
    
<!-- Relative path Image -->
    <vj-top-bar logo="./assets/images/eat_code.jpg">
      <span slot="logo_title">VJ-Topbar</span>
    </vj-top-bar>
```

*Logo Title*

```html
    <span slot="logo_title">VJ-Topbar</span>
```

```javascript
// To assign links & config attributes of vj-top-bar Web component
const topBar = document.getElementsByTagName('vj-top-bar');
if (topBar && topBar.length && topBar[0]) {
    const element = topBar[0];
    const config = {
        'bg-color': '#de6b6b'
    };
    element.setAttribute('config', JSON.stringify(config));
    element.setAttribute(
        'links',
        `${JSON.stringify([
        { address: '#grey', anchorText: 'Grey' },
        { address: '#red', anchorText: 'Red' },
        { address: '#blue', anchorText: 'Blue' }
        ])}`
    );
}
<script>

</script>
```

## Attributes

### logo
Accepts logo image in any one of the format (Url, relative path). Else default logo will be shown.

### config
For configuring such as background-color of top-bar

### links
For having menu links which expects an array of objects each object has address and anchorText properties


## License
MIT &copy; [Srinivasan K K](https://srinivasankk.com)