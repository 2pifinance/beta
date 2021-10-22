#!/usr/bin/env sh

set -eu

NEXT_PUBLIC_SENTRY_RELEASE=${NEXT_PUBLIC_SENTRY_RELEASE:=CF-${CF_PAGES_COMMIT_SHA:=dev}}

export NEXT_PUBLIC_SENTRY_RELEASE

node scripts/sentry.js
