### reserved-tokens

#### Installation

```
npm install reserved-tokens
```

#### API

```javascript
import { isReserved, getValidVarName } from 'reserved-tokens';
const valid = !isReserved(word);
const validName = getValidVarName(word);
```

This lib uses the latest word map from [v8 scanner](https://github.com/v8/v8/blob/master/src/parsing/scanner-inl.h#L18)

