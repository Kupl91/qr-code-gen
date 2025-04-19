module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "eslint:recommended",
        "next",
        "next/core-web-vitals",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:import/typescript",
        "prettier"
    ],
    "ignorePatterns": ["dist", ".eslintrc.cjs"],
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier",
        "import",
        "sort-exports",
        "unused-imports"
    ],
    "settings": {
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true,
                "project": "./tsconfig.json"
            }
        }
    },
    "rules": {
        "prettier/prettier": "off",
        "no-console": ["warn", { "allow": ["warn", "error"] }],
        "react/prop-types": "off",
        "max-lines-per-function": ["error", 450],
        "import/no-cycle": "warn",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "varsIgnorePattern": "^_",
                "args": "after-used",
                "argsIgnorePattern": "^_"
            }
        ],
        "import/no-restricted-paths": [
            "error",
            {
                "zones": [
                    {
                        "target": "./src/shared",
                        "from": "./src/(features|entities|widgets|pages|app)",
                        "message": "shared слой не может зависеть от других слоев"
                    },
                    {
                        "target": "./src/entities",
                        "from": "./src/(features|widgets|pages|app)",
                        "message": "entities слой может зависеть только от shared"
                    },
                    {
                        "target": "./src/features",
                        "from": "./src/(widgets|pages|app)",
                        "message": "features слой может зависеть только от entities и shared"
                    },
                    {
                        "target": "./src/widgets",
                        "from": "./src/(pages|app)",
                        "message": "widgets слой может зависеть только от features, entities и shared"
                    },
                    {
                        "target": "./src/pages",
                        "from": "./src/app",
                        "message": "pages слой может зависеть от всех слоев кроме app"
                    },
                    {
                        "target": "./src",
                        "from": "./src/**/*(model|lib|ui)/(?!index).*",
                        "message": "Импорт из внутренних модулей запрещен. Используйте публичное API через index.ts"
                    }
                ]
            }
        ],
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "react-hooks/rules-of-hooks": "warn",
        "react-hooks/exhaustive-deps": "warn",
        "import/order": "off",
        "no-restricted-imports": [
            "error",
            {
                "patterns": [
                    {
                        "group": [
                            "@/features/*/*/**",
                            "@/features/*/model/*",
                            "@/features/*/lib/*",
                            "@/features/*/ui/*"
                        ],
                        "message": "Прямой импорт из внутренних модулей feature запрещен. Используйте публичное API из index.ts"
                    },
                    {
                        "group": [
                            "@/entities/*/*/**",
                            "@/entities/*/model/*",
                            "@/entities/*/lib/*",
                            "@/entities/*/ui/*"
                        ],
                        "message": "Прямой импорт из внутренних модулей entity запрещен. Используйте публичное API из index.ts"
                    },
                    {
                        "group": [
                            "@/shared/*/*/**",
                            "@/shared/*/model/*",
                            "@/shared/*/lib/*",
                            "@/shared/*/ui/*"
                        ],
                        "message": "Прямой импорт из внутренних модулей shared запрещен. Используйте публичное API из index.ts"
                    }
                ]
            }
        ]
    },
    "overrides": [
        {
            "files": ["**/features/*/index.ts"],
            "rules": {
                "import/no-restricted-paths": "off"
            }
        }
    ]
}; 