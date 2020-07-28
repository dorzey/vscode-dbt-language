# vscode-sqlfluff

[![Version](https://vsmarketplacebadge.apphb.com/version/dorzey.vscode-dbt-language.svg)](https://marketplace.visualstudio.com/items?itemName=dorzey.vscode-dbt-language) [![Installs](https://vsmarketplacebadge.apphb.com/installs-short/dorzey.vscode-dbt-language.svg)](https://marketplace.visualstudio.com/items?itemName=dorzey.vscode-dbt-language) ![.github/workflows/ci.yml](https://github.com/dorzey/vscode-dbt-language/workflows/.github/workflows/ci.yml/badge.svg)

An extension that offers some [DBT](https://www.getdbt.com/) language features. For some features to work you will have to have run DBT compile as this generates the manifest.

Implemented features:

- `CMD`+`click` on `ref`s to open DBT SQL model file

## Configuration

```json
{
 "dbt.manifestLocation": "location of the DBT manifest"
}
```